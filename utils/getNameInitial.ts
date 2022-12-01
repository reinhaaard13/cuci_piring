export default function getNameInitials(name: string) {
  const nameSplit = name.split(" ");
  
  const initial = nameSplit.map(name => name.charAt(0));

  return initial.join("");
}