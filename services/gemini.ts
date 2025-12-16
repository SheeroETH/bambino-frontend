// Replaced Google GenAI with local backend call
export const generateBambinoImage = async (userPrompt: string): Promise<string> => {
  try {
    // Helper to convert image to base64
    const getBase64Image = async (url: string) => {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    };

    // Load and convert the base image
    const baseImage = await getBase64Image('/bambino.png');

    const apiUrl = import.meta.env.VITE_API_URL || 'https://bambino-backend-1uyt.onrender.com';
    const response = await fetch(`${apiUrl}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: userPrompt,
        image: baseImage
      }),
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