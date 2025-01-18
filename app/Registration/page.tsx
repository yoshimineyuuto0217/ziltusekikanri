import React from "react";

const page = () => {
  return (
    <>
      <h1 className="text-center text-[2.5em] mb-5">新規登録</h1>
      <form
        action=""
        className="bg-gray-200 py-10 px-5 sm:max-w-[800px]  w-[90%] m-auto "
      >
        <div className="flex flex-col sm:flex sm:flex-row sm:flex-wrap w-[100%]">
          <label htmlFor="name" className="sm:w-[10%] w-[100%]">
            製品名
          </label>
          <input
            type="name"
            id="name"
            name="name"
            className="w-[100%] sm:w-[90%] mb-5"
          />
          <label htmlFor="name" className="sm:w-[10%] w-[100%]">
            生産数
          </label>
          <input
            type="name"
            id="name"
            name="name"
            className="w-[100%] sm:w-[35%] mb-5 mr-[10%]"
          />
          <label htmlFor="name" className="sm:w-[10%] w-[100%]">
            生産日 
          </label>
          <input type="name" id="name" name="name" className="w-[100%] sm:w-[35%] mb-5" />
          <label htmlFor="name" className="sm:w-[10%] w-[100%]">
            重　量 
          </label>
          <input
            type="name"
            id="name"
            name="name"
            className="sm:w-[35%] w-[100%] mb-5 mr-[10%]"
          />
          <label htmlFor="name" className="sm:w-[10%] w-[100%]">
            厚　み 
          </label>
          <input type="name" id="name" name="name" className="sm:w-[35%] mb-5 w-[100%]" />
          <label htmlFor="remarks" className="sm:w-[10%] w-[100%]">
            備考欄 
          </label>
          <textarea
            id="remarks"
            name="remarks"
            className="sm:w-[90%] w-[100%] mb-10 h-[200px] p-2"
            maxLength={200}
          />
        </div>
        <button
          type="submit"
          className=" w-[100%]  mb-5 bg-blue-500  p-3 hover:bg-blue-600 transition "
        >
          登録
        </button>
      </form>
    </>
  );
};

export default page;
