import SkeletonButton from "./SkeletonButton";
import SkeletonInput from "./SkeletonInput";
import SkeletonSelect from "./SkeletonSelect";

type SkeletonFieldType = "input" | "select" | "button";

interface SkeletonField {
  type: SkeletonFieldType;
  count: number;
}

interface FilterSkeletonProps {
  fields: SkeletonField[];
  showLabel?: boolean;
  className?: string;
}

export default function FilterSkeleton({
  fields,
  showLabel = false,
  className = "",
}: FilterSkeletonProps) {
  return (
    <div
      className={`
        grid grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        gap-5
        p-6
        ${className}
      `}
    >
      {fields.flatMap((field, groupIndex) =>
        Array.from({ length: field.count }).map((_, index) => (
          <div key={`${groupIndex}-${index}`}>
            {renderSkeleton(field.type, showLabel)}
          </div>
        ))
      )}
    </div>
  );
}

function renderSkeleton(
  type: SkeletonFieldType,
  showLabel: boolean
) {
  switch (type) {
    case "input":
      return <SkeletonInput showLabel={showLabel} />;

    case "select":
      return <SkeletonSelect showLabel={showLabel} />;

    case "button":
      return <SkeletonButton width="full"/>;

    default:
      return null;
  }
}