import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { NextRequest, NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export async function POST(request: NextRequest) {
  // Extract FormData from the request
  const data = await request.formData();
  // Extract the uploaded file from the FormData
  const file: File | null = data.get("file") as unknown as File;

  // Make sure file exists
  if (!file) {
    return NextResponse.json({ success: false, error: "No file found" });
  }

  // Make sure file is a PDF
  if (file.type !== "application/pdf") {
    return NextResponse.json({ success: false, error: "Invalid file type" });
  }

  // Initialize the PDFLoader to load the PDF
  const pdfLoader = new PDFLoader(file);

  // Use a RecursiveCharacterTextSplitter to split the PDF into smaller chunks
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000, // Adjust chunk size according to your needs
    chunkOverlap: 200, // Adjust overlap if needed
  });

  // Load and split the PDF document using the text splitter
  const splitDocuments = await pdfLoader.loadAndSplit(textSplitter);

  // Initialize the Pinecone client
  const pinecone = new Pinecone();
  const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME as string);

  // Store the split documents in Pinecone
  await PineconeStore.fromDocuments(splitDocuments, new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_KEY,
  }), {
    pineconeIndex,
  });

  return NextResponse.json({ success: true });
}
