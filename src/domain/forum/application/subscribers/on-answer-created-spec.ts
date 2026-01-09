import { makeAnswer } from "test/factories/make-answer"
import { OnAnswerCreated } from "./on-answer-created"
import { InMemoryAnswerRepository } from "test/repositories/in-memory-answers-repository"
import { InMemoryAnswerAttachmentRepository } from "test/repositories/in-memory-answer-attachments-repository"

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentRepository
let inMemoryAnswerRepository : InMemoryAnswerRepository

describe('On Answer Created', () => {
    beforeEach(() => {
        inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentRepository()
        inMemoryAnswerRepository = new InMemoryAnswerRepository(inMemoryAnswerAttachmentsRepository)
    })
    it('should send anotification when an answer is created', async () => {
        const onAnswerCreated = new OnAnswerCreated()

        const answer = makeAnswer()

         inMemoryAnswerRepository.create(answer)


    })
})