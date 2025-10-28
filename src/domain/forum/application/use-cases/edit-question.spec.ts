import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository';
import { makeQuestion } from 'test/factories/make-question';

import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { EditQuestionUseCase } from './edit-question';

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let sut: EditQuestionUseCase;

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionRepository);
  });

  it('should be able to Edit a question', async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    );

    await inMemoryQuestionRepository.create(newQuestion);

    await sut.execute({
      authorId: 'author-1',
      questionId: newQuestion.id.toValue(),
      title: 'title-1',
      content: 'content-1'
    });

    expect(inMemoryQuestionRepository.items[0]).toMatchObject({
        title: 'title-1',
        content: 'content-1'
    })
  });

  it('should not be able to Edit a question from another user', async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    );

    await inMemoryQuestionRepository.create(newQuestion);

    await expect(
      sut.execute({
        authorId: "author-2",
        questionId: newQuestion.id.toValue(),
        title: "title-1",
        content: "content-1",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
