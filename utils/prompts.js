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
    `You are a teacher explaining a TOEIC question to a student.

                    Provide a brief, single-line explanation for why "${question.correctAnswer}" is the correct answer for this question: "${question.question}".
                     
                    Options are: ${question.options}. 
                    Explain succinctly why other options are incorrect.
                    Here are more contexts:
                    This TOEIC question is of type: ${question.type}
                    Here is the audio that is included in the question: ${question.audioURL}
                    Here is the image that is included in the question: ${question.imageURL}
                    If there is no image or audio, just continue with the question.

                    Your response should be a single line string (don't add any special symbol).
                    Example response:
                    "The correct answer is 'Paris' because it is the capital of France, while 'London', 'Berlin', and 'Madrid' are not capitals of France."`;

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

// prompt for generating and reviewing user answer base on the topic as english speaking practice
const userSpeechPrompt = (topic, answer) => `
    You are an English teacher helping a student practice speaking skills.
    The student has provided the following answer: "${answer}" which is related to the topic "${topic}".

    Generate a review of the student's answer, focusing on:
    1. Correctness: Is the answer factually correct?
    2. Clarity: Is the answer clear and easy to understand?
    3. Grammar: Are there any grammatical errors?
    4. Vocabulary: Is the vocabulary appropriate for the topic?
    5. Suggestions: Provide constructive feedback on how the student can improve their answer. (This should be a single paragraph string.)
    6. Overall Score: Give a score out of 100 based on the overall quality of the answer.

    Format your response as a JSON object with the following fields:
    {
        "correctness": "Your assessment of the correctness of the answer",
        "clarity": "Your assessment of the clarity of the answer",
        "grammar": "Your assessment of the grammar used in the answer",
        "vocabulary": "Your assessment of the vocabulary used in the answer",
        "suggestions": "Constructive feedback for improvement",
        "overallScore": "Your overall score out of 100"
    }

    Example response:
    {
        "correctness": "The answer is factually correct.",
        "clarity": "The answer is clear and easy to understand.",
        "grammar": "There are no grammatical errors.",
        "vocabulary": "The vocabulary is appropriate for the topic.",
        "suggestions": "Consider adding more details to enhance the answer.",
        "overallScore": 90
    }`;

// this prompt is used to generate a writing score based on the user's answer to a question
const userWritingPrompt = (question, answer, suggestionAnswer) => `
    You are an English teacher evaluating a student's writing response.
    The student has answered the following question: "${question}" with the answer: "${answer}".
    Here is a suggested answer for reference: "${suggestionAnswer}".

    Generate a review of the student's writing, focusing on:
    1. Content: Does the answer address the question effectively, and how does it compare to the suggested answer?
    2. Structure: Is the answer well-organized with a clear introduction, body, and conclusion?
    3. Grammar: Are there any grammatical errors?
    4. Vocabulary: Is the vocabulary appropriate and varied?
    5. Suggestions: Provide constructive feedback on how the student can improve their writing. (This should be a single paragraph string.)
    6. Overall Score: Give a score out of 100 based on the overall quality of the writing. (This should be a number, not a string.)

    Format your response as a JSON object with the following fields:
    {
        "content": "Your assessment of the content of the answer, including comparison to the suggested answer",
        "structure": "Your assessment of the structure of the answer",
        "grammar": "Your assessment of the grammar used in the answer",
        "vocabulary": "Your assessment of the vocabulary used in the answer",
        "suggestions": "Constructive feedback for improvement",
        "overallScore": "Your overall score out of 100"
    }
    
    Example response:
    {
        "content": "The answer addresses the question but could include more details as seen in the suggested answer.",
        "structure": "The answer is organized but lacks a clear conclusion.",
        "grammar": "There are some grammatical errors that need correction.",
        "vocabulary": "The vocabulary is appropriate but could be more varied.",
        "suggestions": "Consider improving the structure by adding more transitional phrases and expanding on key points.",
        "overallScore": 80
    }`;

module.exports = {
    contextPrompt,
    dialoguePrompt,
    explanationPrompt,
    flashcardPrompt,
    userSpeechPrompt,
    userWritingPrompt,
};
