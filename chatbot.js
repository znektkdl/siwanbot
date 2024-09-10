const axios = require('axios');

exports.handler = async (event) => {
  const { message } = JSON.parse(event.body);

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        }
      }
    );

    const botMessage = response.data.choices[0].message.content;

    return {
      statusCode: 200,
      body: JSON.stringify({ botMessage }),
    };
  } catch (error) {
    console.error('Error with OpenAI API:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to communicate with OpenAI' }),
    };
  }
};
