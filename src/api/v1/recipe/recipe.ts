import { baseAPI } from '@/config/axios';

export const deleteRecipe = async (id?: string) => {
  await baseAPI.delete(`/recipes/${id}`);
};

export const createRecipe = async (newData: RecipeType) => {
  await baseAPI.post('/recipes', newData);
};

export const updateRecipe = async (
  id: string | undefined,
  data: RecipeType
) => {
  return await baseAPI.put(`/recipes/${id}`, data);
};

export const fetchallRecipes = async (page: string | number) => {
  const { data } = await baseAPI.get(`/recipes?limit=30&page${page}`);
  return data.data;
};
