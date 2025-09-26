import { expect, test} from 'vitest'
import { AnswerQuestionsUseCase } from './answer-question'

test('create an answer' , () => {
    const answerQuestion = new AnswerQuestionsUseCase()

    const answer = answerQuestion.execute({
        content: 'Nova Resposta',
        questionId: '1',
        instructorId: '1'
    })

    expect(answer.content).toEqual('Nova Resposta')
})