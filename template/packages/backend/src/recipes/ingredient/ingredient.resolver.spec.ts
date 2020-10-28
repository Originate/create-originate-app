import { Test, TestingModule } from '@nestjs/testing';
import { IngredientResolver } from './ingredient.resolver';

describe('IngredientResolver', () => {
  let resolver: IngredientResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IngredientResolver],
    }).compile();

    resolver = module.get<IngredientResolver>(IngredientResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
