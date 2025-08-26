// import ComparisonSelectCard from '@/features/comparison-select/ComparisonSelectCard';
// import type { ComparisonMySubSectionProps } from '@/widgets/comparison-section/model/types';

// export const ComparisonMySubSection = ({
//   category,
//   mySubs,
//   selectedSubs,
//   handleSelect,
//   handleDetail,
// }: ComparisonMySubSectionProps) => (
//   <section className="py-[10px] space-y-4 mb-[10px]">
//     <header className="flex typo-body-m-bold">
//       <h2 className="typo-body-m-bold">
//         <span className="text-primary-700">내가 구독 중인</span> {category}
//       </h2>
//     </header>

//     <div className="grid grid-cols-2 gap-[14px]">
//       {mySubs.map(p => (
//         <ComparisonSelectCard
//           key={p.id}
//           product={p}
//           isSelected={selectedSubs.includes(p.id)}
//           setIsSelected={() => handleSelect(p.id)}
//               handleDetail={handleDetail}
//               isMySub={true}
//         />
//       ))}
//     </div>
//   </section>
// );
