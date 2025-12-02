import { expect } from 'vitest'
import { CreateQuestiosUseCase } from './create-question';
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository';

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: CreateQuestiosUseCase

describe('Create Question', () => {
    beforeEach(() => {
        inMemoryQuestionRepository = new InMemoryQuestionRepository()
        sut = new CreateQuestiosUseCase(inMemoryQuestionRepository)
    })
    it('should be able to create a question' , async () => {
        const result = await sut.execute({
            authorId: '1',
            title: 'nova pergunta',
            content: 'Conteúdo da pergunta'
        })
        expect(result.isRight()).toBe(true)
    
        expect(inMemoryQuestionRepository.items[0]).toEqual(result.value?.question)
    })

})
