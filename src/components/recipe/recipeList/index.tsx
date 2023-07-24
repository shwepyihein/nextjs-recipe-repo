import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

import React from 'react';

type RecipeListProps = {
  searchInput: string;
  data: RecipeType[];
  callBackDelete: (recipe: RecipeType) => void;
  callBackDetail: (recipe: RecipeType) => void;
  callBackUpdate: (recipe: RecipeType) => void;
};

const RecipeList = ({
  data,
  searchInput,
  callBackDetail,
  callBackDelete,
  callBackUpdate,
}: RecipeListProps) => {
  const filteredRecipes = data.filter((recipe: RecipeType) => {
    // Split the search query into individual words
    const searchWords = searchInput.toLowerCase().split(' ');

    // Check if any of the words match the recipe's title
    return searchWords.some((word: string) =>
      recipe.title.toLowerCase().includes(word)
    );
  });

  return (
    <div>
      <div className="mt-5 py-5 px-5 grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-5">
        {filteredRecipes.map((item: RecipeType, idx: number) => (
          <div
            key={idx}
            onClick={() => callBackDetail(item)}
            className=" shadow-md cursor-pointer rounded-lg px-4 py-3 border "
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-lg font-bold">{item.title}</p>
                <p className="text-sm text-gray-500">Type : {item.category}</p>
              </div>
              <div className="flex mt-2 items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    callBackUpdate(item);
                  }}
                  className="outline-none bg-none"
                >
                  <PencilIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    callBackDelete(item);
                  }}
                  className="outline-none bg-none"
                >
                  <TrashIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
            <p className="mt-5 text-sm font-medium">ingredients</p>
            <div className="flex  mt-2 flex-wrap gap-x-3 gap-y-1">
              {item.ingredients?.map((ingredient: string, idx) => (
                <p
                  key={idx}
                  className="text-sm text-black px-2 py-1 bg-gray-300 rounded-full"
                >
                  {ingredient}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
