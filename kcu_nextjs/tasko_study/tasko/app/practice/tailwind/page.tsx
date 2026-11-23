export default function TailwindPracticePage (){

  return (
    <div className="min-h-screen bg-gray-100" > 
    <header className="flex" items-center justify-between bg-white px-4 py-4 shadow-sm>
      <div className="text-xl font-bold text-blue-600">tasko</div>
      <nav className="flex gap-6 text-gray-700">
        <a href="#" className="hover:text-blue-600">할일</a>
        <a href="#" className="hover:text-blue-600">세할일</a>
      </nav>
      <nav>
        <a>할일</a>
        <a>새할일</a>
      </nav>
    </header>
    <main className="mx-auto max-w-4xl px-r py-8">
    <h1 className="mb-4 text-2xl font-bold">타일윈드 CSS 요점 연습</h1>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <article className=" rounded-xl border border-gray-200 bg-white p-5 shadow-md">
        <h2 className="mb-2 text-lg font-semibold">카드1</h2>
        <p className="text-sm text-gray-600 ">화면너비</p>
      </article>
      <article className=" rounded-xl border border-gray-200 bg-white p-5 shadow-md">
        <h2 className="mb-2 text-lg font-semibold">카드2</h2>
        <p className="text-sm text-gray-600 ">화면너비</p>
      </article>
      <article className=" rounded-xl border border-gray-200 bg-white p-5 shadow-md">
        <h2 className="mb-2 text-lg font-semibold">카드3</h2>
        <p className="text-sm text-gray-600 ">화면너비</p>
      </article>
    </div>

    <div className="mt-8 flex gap-2 ">
      <input className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" type="text" placeholder="눌러보세요"/>
      <button className="bg-blue-600 text-white  px-4 py-2 rounded-md transition hover:bg-blue-700 ">추가</button>
    </div>

    </main>

    <p>TialwindPracticPage</p>
    </div>
  )
}