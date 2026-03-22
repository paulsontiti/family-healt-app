export default function ChildCard({ child }: any) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-bold">{child.name}</h3>
      <p>Age: {child.age}</p>
      <p>Weight: {child.weight}kg</p>
      <p>Height: {child.height}cm</p>
    </div>
  );
}