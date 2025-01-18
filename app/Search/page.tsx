import React from 'react'

const page = () => {
  return (
    <>
      <h1 className="text-center text-[2.5em] mb-5">実績検索</h1>
      <form action=""className="bg-gray-200 py-10 px-5 sm:max-w-[800px]  w-[90%] m-auto ">
        <div className="sm:flex mb-5 m-auto w-[100%] ">
          <label
            htmlFor="name"
            className="sm:w-[15%] w-[100%] text-center"
          >
            製品名
          </label>
          <input
            type="name"
            id="name"
            name="name"
            placeholder="製品名を入れてください"
            className="sm:w-[85%] w-[100%]"
          />
        </div>
        <button
          type="submit"
          className=" w-[100%] bg-blue-500  p-3 hover:bg-blue-600 transition "
        >
          検索
        </button>
      </form>
    </>
  )
}

export default page