# PDF-Chat

This is a `Next.js` project that allows you to upload a PDF and interact with its content using OpenAI's language model. The project uses [Langchain](https://github.com/hwchase17/langchain) for handling the PDF documents and Pinecone for storing embeddings of the document text. This enables quick and efficient retrieval-based question answering.

## Getting Started

### Prerequisites

To run this project, you'll need the following:

- A [Pinecone](https://www.pinecone.io) account to store the document embeddings.
- An [OpenAI API key](https://openai.com) to access GPT models.

### Installation

First, clone the repository:

```bash
git clone https://github.com/AjiteshBD/pdf-chat.git
cd pdf-chat
```

Then, install the required dependencies:

```bash
npm install
```

### Setup Environment Variables
Create a ```.env.local``` file in the root of your project and add the following variables:

```bash
PINECONE_API_KEY="your-pinecone-api-key"
PINECONE_INDEX_NAME="your-pinecone-index-name"
OPENAI_API_KEY="your-openai-api-key"
```

Replace the placeholder values with your actual Pinecone and OpenAI API keys.

### Run the Development Server
To start the development server, run the following command:

```bash
npm run dev
```

Once the server is running, open http://localhost:3000 in your browser. You should see the home page where you can upload a PDF file.



