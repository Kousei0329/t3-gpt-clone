import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { createInput } from "~/server/types";
import OpenAI from "openai";



export const gptRouter = createTRPCRouter({
    all: protectedProcedure.query(async ({ ctx  }) => {
        const gPTs = await ctx.db.gPT.findMany({
            where:{
                userId: ctx.session.user.id,
            },
            orderBy: {
                createdAt: "desc",
            },
    });
    return gPTs.map(({id, inputText,outputText})=>({
        id, 
        inputText,
        outputText,
    }));
}),
    create: protectedProcedure.input(createInput).mutation(async ({ ctx, input }) => {
        const openai = new OpenAI();
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                {
                    role: "user",
                    content: input,
                },
            ],
        });
        return ctx.db.gPT.create({
        data: {
            inputText: input,
            outputText: completion.choices[0].message.content,
            user: {
            connect: {
                id: ctx.session.user.id,
            },
            },
        },
        });
    }),

});