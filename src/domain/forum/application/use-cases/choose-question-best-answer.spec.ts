import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answers-repository';
import { DeleteAnswerUseCase } from './delete-answer';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { makeAnswer } from 'test/factories/make-answer';
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository';
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer';
import { makeQuestion } from 'test/factories/make-question';

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let inMemoryAnswerRepository: InMemoryAnswerRepository;
let sut: ChooseQuestionBestAnswerUseCase;

describe('Choose Question Best Answer', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    inMemoryAnswerRepository = new InMemoryAnswerRepository();
    sut = new ChooseQuestionBestAnswerUseCase(inMemoryAnswerRepository, inMemoryQuestionRepository);
  });

  it('should be able to choose question best answer', async () => {
    const question = makeQuestion()
    const newAnswer = makeAnswer({ questionId: question.id });

    await inMemoryQuestionRepository.create(question)
    await inMemoryAnswerRepository.create(newAnswer);

    await sut.execute({
        answerId: newAnswer.id.toString(),
        authorId: question.authorId.toString() ,
    });

    expect(inMemoryQuestionRepository.items[0].bestAnswerId).toEqual(newAnswer.id)
  });

  it('should not be able to to choose another user question best answer', async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityId('author-1'),
    })

    const answer = makeAnswer({
      questionId: question.id,
    })

    await inMemoryQuestionRepository.create(question)
    await inMemoryAnswerRepository.create(answer)

    expect(() => {
      return sut.execute({
        answerId: answer.id.toString(),
        authorId: 'author-2',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})

