import { Test, TestingModule } from '@nestjs/testing';
import { RecipeResolver } from './recipe.resolver';

describe('RecipeResolver', () => {
  let resolver: RecipeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecipeResolver],
    }).compile();

    resolver = module.get<RecipeResolver>(RecipeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
