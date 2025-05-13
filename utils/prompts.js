const contextPrompt = (
    topic
) => `You are two people having a conversation about the topic "${topic}". 
    Generate 5 contexts/scenery that could be used/happened for the topic "${topic}".
    The response should be an array of 5 strings. 
    
    Example for topic "shopping":
    ["Shopping mall", "Supermarket", "Online shopping", "Black Friday", "Window shopping"]`;

const dialoguePrompt = (
    topic,
    context
) => `You are two people having a conversation about the topic "${topic}".

    Generate a dialogue about the topic "${topic}" between two speakers, 
    using the context: "${context}",
    labeled as "Person A" and "Person B". Format each response as: 
    Person A: [line]
    Person B: [line]`;

const explanationPrompt = (question) =>
    `You are a teacher explaining a question to a student.

                    Provide a brief, single-line explanation for why "${
                        question.correctAnswer
                    }" is the correct answer for this question: "${
        question.questionName
    }".
                     
                    Options are: ${question.questionOptions.join(", ")}. 
                    Explain succinctly why other options are incorrect.`;

const flashcardPrompt = (topic) => `
    Generate a flashcard about the topic "${topic}" with the following details:
    - A single word related to the topic.
    - The word's definition.
    - An example sentence using the word in context.
    - The category of the word (e.g., noun, verb, adjective).
    - The createdBy field set to "Google Gemini".

    Format your response exactly like this example:
    {
      "topic": "Fishing",
      "word": "Angling",
      "definition": "the sport of trying to catch fish with a rod, line (= string), and hook",
      "example": "A game fish may be defined as one that will make a good fight for its life and that is caught by scientific methods of angling.",
      "category": "noun",
      "createdBy": "Google Gemini"
    }`;

module.exports = {
    contextPrompt,
    dialoguePrompt,
    explanationPrompt,
    flashcardPrompt,
};
