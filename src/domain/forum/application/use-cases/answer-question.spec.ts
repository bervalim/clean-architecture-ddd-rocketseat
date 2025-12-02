import { expect } from "vitest";
import { AnswerQuestionsUseCase } from "./answer-question";
import { InMemoryAnswerRepository } from "test/repositories/in-memory-answers-repository";

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let sut: AnswerQuestionsUseCase;

describe("Create Answer", () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository();
    sut = new AnswerQuestionsUseCase(inMemoryAnswerRepository);
  });

  it("create an answer", async () => {
    const result = await sut.execute({
      content: "Nova Resposta",
      questionId: "1",
      instructorId: "1",
    });
    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswerRepository.items[0]).toEqual(result.value?.answer);
  });
});
