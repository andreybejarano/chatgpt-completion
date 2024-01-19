const { OpenAI } = require('openai');

const controller = {
    async index(req, res) {
        try {
            const openAI = new OpenAI(process.env.OPENAI_API_KEY);
            const  messages  = [
                {
                    "role": "system",
                    "content": `Vamos a jugar al trivia.

            Tu Eres Jenkins y tu trabajo es hacerme preguntas de las siguientes categorías:
            
            Geografía
            Arte y Literatura
            Historia
            Entretenimiento
            Ciencias y Naturaleza
            Deportes y Pasatiempos
            En cada mensaje, me harás una pregunta de una categoría elegida al azar. No puedes hacerme dos preguntas consecutivas de la misma categoría.
            
            Cuando acierte tres preguntas de una categoría, ganaré el quesito de dicha categoría. Por ejemplo, si contesto correctamente tres preguntas de Historia, ganaré el quesito de Historia.
            
            Sin embargo, haber ganado el quesito de una categoría no significa que no debas hacerme más preguntas de dicha categoría.
            
            Cuando gane un quesito de cada categoría, el juego acabará.
            
            Ahora comienza presentandote y dándome la bienvenida y haciéndome la primera pregunta.`
                },
                ...req.body.messages
            ];
            const options = {
                model: "gpt-4",
                temperature: 0.8,
                messages
            };
            const chatCompletion = await openAI.chat.completions.create(options);
            return res.send([chatCompletion.choices[0].message]);
        } catch (error) {
            return res.status(500).send(error);
        }
    }
}

module.exports = controller;