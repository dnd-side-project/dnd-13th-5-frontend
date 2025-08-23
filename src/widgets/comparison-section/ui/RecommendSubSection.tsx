const RecommendSubSection = () => (
    <section>
      <header className="flex items-center gap-5 mb-[18px] ">
        <h1 className="typo-title-l-bold">이런 서비스는 어때요?</h1>
      </header>

      <div className="bg-gray-50 rounded-[10px] px-[15px] py-[30px] space-y-5">
        <h2 className="typo-body-m-bold">추천하는 서비스</h2>

        {/* 랜덤으로 카테고리에 해당하는 2개 서비스 보여주기 */}
        <div className="space-y-4">
          <div className="px-5 py-4 bg-white rounded-[10px] w-full h-[84px]"></div>
          <div className="px-5 py-4 bg-white rounded-[10px] w-full h-[84px]"></div>
        </div>
      </div>
    </section>
  );

export default RecommendSubSection;
