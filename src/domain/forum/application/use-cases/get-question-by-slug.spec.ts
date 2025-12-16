import { expect } from 'vitest'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository';
import { GetQuestionBySlugUseCase } from './get-question-by-slug';
import { makeQuestion } from 'test/factories/make-question';
import { Slug } from '../../enterprise/entities/value-objects/slug';
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/in-memory-question-attachments-repository';

let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
    beforeEach(() => {
        inMemoryQuestionAttachmentsRepository =
            new InMemoryQuestionAttachmentRepository()
        inMemoryQuestionRepository = new InMemoryQuestionRepository(inMemoryQuestionAttachmentsRepository)
        sut = new GetQuestionBySlugUseCase(inMemoryQuestionRepository)
    })
    it('should be able to get a question by slug' , async () => {
        const newQuestion = makeQuestion({
            slug: Slug.create('example-question')
        })
        await inMemoryQuestionRepository.create(newQuestion)

        const result = await sut.execute({
            slug: 'example-question'
        })
    
        expect(result.isRight()).toBe(true)

        if (result.isRight()) {
            expect(result.value.question.id).toBeTruthy()
        }
    })
})
