'use client';
import { useEffect, useState } from 'react';
import RecipeList from '@/components/recipe/recipeList';
import { mutate } from 'swr';
import DialogModel from '@/ui/Dialog';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { deleteRecipe, fetchallRecipes } from '@/api/v1/recipe/recipe';
import ReciperSlider from '@/components/recipe/recipeSlider';
import { useRouter } from 'next/navigation';

export default function Page() {
  const navigate = useRouter();
  // create
  const [open, setOpen] = useState(false);

  // update
  const [updateSlide, setUpdateSlide] = useState(false);
  const [updateData, setUpdateData] = useState<RecipeType>();

  // delete
  const [DeleteDialog, setDeleteDialog] = useState(false);
  const [deleteData, setDeleteData] = useState<RecipeType>();

  // detail

  const [detailDailog, setDetailDialog] = useState(false);
  const [detailData, setDetailData] = useState<RecipeType>();

  // search

  const [searchInput, setSearchInput] = useState('');
  // recipe

  const [data, setData] = useState([]);

  const fetchRecipe = async () => {
    const { data } = await fetchallRecipes(1);
    setData(data);
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  const callBackUpdate = (v: RecipeType) => {
    setUpdateSlide(true);
    setUpdateData(v);
  };

  const callBackDetail = (v: RecipeType) => {
    setDetailDialog(true);
    setDetailData(v);
  };

  const callBackDelete = (v: RecipeType) => {
    setDeleteDialog(true);
    setDeleteData(v);
  };

  const handleDelete = async () => {
    await deleteRecipe(deleteData?.id).then((res) => {
      mutate('/recipes');
      setDeleteDialog(false);
    });
  };

  return (
    <>
      <ReciperSlider type="create" open={open} setOpen={setOpen} />
      <ReciperSlider
        updateData={updateData}
        type="update"
        open={updateSlide}
        setOpen={setUpdateSlide}
      />
      <DialogModel open={DeleteDialog} setOpen={setDeleteDialog}>
        <p className="text-xl font-semibold">Are you Sure ?</p>
        <p className="font-normal mt-3">Do u want to delete Food Recipe?</p>
        <div className="mt-4 flex gap-2 justify-end">
          <button
            onClick={() => {
              setDeleteDialog(false);
            }}
            className="w-1/2 px-5 py-2 text-sm text-gray-800 transition-colors duration-200 bg-white border rounded-lg sm:w-auto"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="w-1/2 px-5 py-2 text-sm text-white transition-colors duration-200 bg-red-400 border rounded-lg sm:w-auto"
          >
            Delete
          </button>
        </div>
      </DialogModel>

      <DialogModel open={detailDailog} setOpen={setDetailDialog}>
        <div className="flex items-center justify-between">
          <div className=" capitalize text-xl font-semibold leading-6 text-gray-900">
            {detailData?.title}
          </div>
          <div className="ml-3 flex h-7 items-center">
            <button
              type="button"
              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => setDetailDialog(false)}
            >
              <span className="sr-only">Close panel</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div>
          <p className="mt-5 text-md font-medium">
            Type : <span className="text-gray-500">{detailData?.category}</span>
          </p>
          <p className="mt-5 text-sm font-semibold">Ingredients</p>
          <div className="flex  mt-2 flex-wrap gap-x-3 gap-y-1">
            {detailData?.ingredients?.map((ingredient: string, idx) => (
              <p
                key={idx}
                className="text-sm text-black px-2 py-1 bg-gray-300 rounded-full"
              >
                {ingredient}
              </p>
            ))}
          </div>
          <p className="mt-5 text-md font-semibold">Description</p>
          <p className="text-sm">{detailData?.description}</p>
        </div>
      </DialogModel>
      <div className="md:max-w-screen-lg py-10  px-10 mx-auto">
        <div className="flex mt-3 w-full lg:flex-row flex-col-reverse items-center justify-between">
          <div className=" w-full relative rounded-lg shadow-sm max-w-auto  px-5 border py-3 sm:max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 20 20"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              name="search"
              className="outline-none block w-full pl-5 sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter Recipe name"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <div className="flex mb-4 lg:mb-0 w-full lg:justify-end justify-between">
            <p className="lg:hidden text-2xl font-bold">Recipes</p>
            <button
              onClick={() => {
                setOpen(true);
              }}
              className="w-1/2 px-5 py-2 text-sm text-white transition-colors duration-200 bg-black border rounded-lg sm:w-auto"
            >
              Create the Recipe
            </button>
          </div>
        </div>

        <RecipeList
          data={data}
          searchInput={searchInput}
          callBackDetail={callBackDetail}
          callBackDelete={callBackDelete}
          callBackUpdate={callBackUpdate}
        />
      </div>
    </>
  );
}
