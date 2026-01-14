import { makeAnswer } from "test/factories/make-answer"
import { OnAnswerCreated } from "./on-answer-created"
import { InMemoryAnswerRepository } from "test/repositories/in-memory-answers-repository"
import { InMemoryAnswerAttachmentRepository } from "test/repositories/in-memory-answer-attachments-repository"
import { InMemoryQuestionRepository } from "test/repositories/in-memory-questions-repository"
import { InMemoryQuestionAttachmentRepository } from "test/repositories/in-memory-question-attachments-repository"
import { SendNotificationUseCase } from "@/domain/notification/application/use-cases/send-notification"
import { InMemoryNotificationsRepository } from "test/repositories/in-memory-notifications-repository"
import { makeQuestion } from "test/factories/make-question"
import { MockInstance } from "vitest"
import { waitFor } from "test/utils/wait-for"

let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentRepository
let inMemoryAnswersRepository: InMemoryAnswerRepository
let inMemoryQuestionsRepository: InMemoryQuestionRepository
let notificationsRepository: InMemoryNotificationsRepository
let sendNotificationUseCase: SendNotificationUseCase
let sendNotificationExecuteSpy: MockInstance


describe('On Answer Created', () => {
    beforeEach(() => {
        inMemoryQuestionAttachmentRepository = new InMemoryQuestionAttachmentRepository()
        inMemoryQuestionsRepository = new InMemoryQuestionRepository(inMemoryQuestionAttachmentRepository)
        inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentRepository()
        inMemoryAnswersRepository = new InMemoryAnswerRepository(inMemoryAnswerAttachmentsRepository)
        notificationsRepository = new InMemoryNotificationsRepository()
        sendNotificationUseCase = new SendNotificationUseCase(notificationsRepository)
        sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'create')
        new OnAnswerCreated(inMemoryQuestionsRepository,sendNotificationUseCase)
    })
    it('should send anotification when an answer is created', async () => {
        const question = makeQuestion()
        const answer = makeAnswer({ questionId: question.id})
        inMemoryQuestionsRepository.create(question)
        inMemoryAnswersRepository.create(answer)


       await waitFor(() => {
        expect(sendNotificationExecuteSpy).toHaveBeenCalled()
       })


    })
})