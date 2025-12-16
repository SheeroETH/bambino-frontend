// Replaced Google GenAI with local backend call
export const generateBambinoImage = async (userPrompt: string): Promise<string> => {
  try {
    const response = await fetch('http://localhost:3001/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: userPrompt }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate image');
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};