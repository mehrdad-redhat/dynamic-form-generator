export function nameDecorate(name: string): string {
	const withoutDash = name.replace('-', ' ');
	return withoutDash.charAt(0).toUpperCase() + withoutDash.slice(1)
}
