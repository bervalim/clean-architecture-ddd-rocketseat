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
    const { answer } = await sut.execute({
      content: "Nova Resposta",
      questionId: "1",
      instructorId: "1",
    });

    expect(answer.content).toEqual("Nova Resposta");
    expect(answer.id).toBeTruthy();
    expect(inMemoryAnswerRepository.items[0].id).toEqual(answer.id);
  });
});
