import { FamilyMembers } from "../models/Family";

export default function spoilMembersNames(members: FamilyMembers[]) {
  if (members.length === 0) {
    return "Tidak ada anggota";
  } else if (members.length === 1) {
    return `Cuma ${members[0].alias || members[0].fullname.split(" ")[0]}`;
  } else if (members.length === 2) {
    return `${members[0].alias || members[0].fullname.split(" ")[0]} dan ${members[1].fullname.split(" ")[0]}`;
  } else {
    return `${members[0].alias || members[0].fullname.split(" ")[0]}, ${members[1].fullname.split(" ")[0]} dan ${members.length - 2} lainnya`;
  }
}