export default function generateFamilyCode(familyName: string) {
	const CODE_LENGTH = 6;

	const familyNames = familyName.split(" ");

	const familyInitial = familyNames.reduce((acc, name) => {
		return acc + name[0];
	}, '');

	return familyInitial + getXRandomNumber(CODE_LENGTH - familyInitial.length);
}

function getXRandomNumber(length: number): string {
	let randomNumbers = "";
	for (let i = 0; i < length; i++) {
		randomNumbers += Math.floor(Math.random() * 10);
	}
	return randomNumbers;
}
