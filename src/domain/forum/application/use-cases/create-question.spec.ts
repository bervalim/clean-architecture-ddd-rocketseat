import { expect } from 'vitest'
import { CreateQuestiosUseCase } from './create-question';
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/in-memory-question-attachments-repository';

let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentRepository
let sut: CreateQuestiosUseCase

describe('Create Question', () => {
    beforeEach(() => {
        inMemoryQuestionAttachmentsRepository =  new InMemoryQuestionAttachmentRepository()
        inMemoryQuestionRepository = new InMemoryQuestionRepository(inMemoryQuestionAttachmentsRepository)
        sut = new CreateQuestiosUseCase(inMemoryQuestionRepository)
    })
    it('should be able to create a question' , async () => {
        const result = await sut.execute({
            authorId: '1',
            title: 'nova pergunta',
            content: 'Conteúdo da pergunta',
            attachmentsIds: ['1','2']
        })
        expect(result.isRight()).toBe(true)
    
        expect(inMemoryQuestionRepository.items[0]).toEqual(result.value?.question)
        expect(inMemoryQuestionRepository.items[0].attachments.currentItems).toHaveLength(2)
        expect(inMemoryQuestionRepository.items[0].attachments.currentItems).toEqual([
            expect.objectContaining({attachmentId: new UniqueEntityId('1')}),
            expect.objectContaining({attachmentId: new UniqueEntityId('2')})
         ])
    })

})
