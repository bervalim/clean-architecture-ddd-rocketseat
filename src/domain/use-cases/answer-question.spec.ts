import { expect, test} from 'vitest'
import { AnswerQuestionsUseCase } from './answer-question'
import { AnswerRepository } from '../repositories/answer-repository'
import { Answer } from '../entities/answer'

const fakeAnswersRepository: AnswerRepository = {
    create: async (answer: Answer) => {
        return;
    }
}

test('create an answer' , async () => {
    const answerQuestion = new AnswerQuestionsUseCase(fakeAnswersRepository)

    const answer = await answerQuestion.execute({
        content: 'Nova Resposta',
        questionId: '1',
        instructorId: '1'
    })

    expect(answer.content).toEqual('Nova Resposta')
})