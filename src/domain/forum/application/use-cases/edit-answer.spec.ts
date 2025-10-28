import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answers-repository';
import { makeAnswer } from 'test/factories/make-answer';

import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { EditAnswerUseCase } from './edit-answer';

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let sut: EditAnswerUseCase;

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository();
    sut = new EditAnswerUseCase(inMemoryAnswerRepository);
  });

  it('should be able to Edit a answer', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('answer-1'),
    );

    await inMemoryAnswerRepository.create(newAnswer);

    await sut.execute({
      authorId: 'author-1',
      answerId: newAnswer.id.toValue(),
      content: 'content-1'
    });

    expect(inMemoryAnswerRepository.items[0]).toMatchObject({
        content: 'content-1'
    })
  });

  it('should not be able to Edit a answer from another user', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('answer-1'),
    );

    await inMemoryAnswerRepository.create(newAnswer);

    await expect(
      sut.execute({
        authorId: "author-2",
        answerId: newAnswer.id.toValue(),
        content: "content-1",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
