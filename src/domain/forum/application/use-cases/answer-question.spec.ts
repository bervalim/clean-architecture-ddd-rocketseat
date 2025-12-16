import { expect } from "vitest";
import { AnswerQuestionsUseCase } from "./answer-question";
import { InMemoryAnswerRepository } from "test/repositories/in-memory-answers-repository";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { InMemoryAnswerAttachmentRepository } from "test/repositories/in-memory-answer-attachments-repository";

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentRepository
let sut: AnswerQuestionsUseCase;

describe("Create Answer", () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentRepository()
    inMemoryAnswerRepository = new InMemoryAnswerRepository(inMemoryAnswerAttachmentsRepository);
    sut = new AnswerQuestionsUseCase(inMemoryAnswerRepository);
  });

  it("create an answer", async () => {
    const result = await sut.execute({
      content: "Nova Resposta",
      questionId: "1",
      instructorId: "1",
      attachmentsIds: ['1', '2']

    });
    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswerRepository.items[0]).toEqual(result.value?.answer);
    expect(inMemoryAnswerRepository.items[0].attachments.currentItems).toHaveLength(2)
    expect(inMemoryAnswerRepository.items[0].attachments.currentItems).toEqual([
        expect.objectContaining({attachmentId: new UniqueEntityId('1')}),
        expect.objectContaining({attachmentId: new UniqueEntityId('2')})
      ])
  });
});
