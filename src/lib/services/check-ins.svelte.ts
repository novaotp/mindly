export interface CheckIn {
	id: string;
	date: string;
	mood: string;
	emotions: string[];
	note: string;
}

class CheckInStorage {
	private static STORAGE_KEY = 'check-ins';

	private current = $state<CheckIn[]>([]);

	constructor() {
		this.loadFromStorage();
	}

	get all() {
		return this.current;
	}

	public add(data: Omit<CheckIn, 'id' | 'date'>) {
		const entry: CheckIn = {
			...data,
			id: crypto.randomUUID(),
			date: new Date().toISOString()
		};

		this.current.push(entry);
		this.saveToLocalStorage();

		return entry;
	}

	private loadFromStorage() {
		const data = localStorage.getItem(CheckInStorage.STORAGE_KEY);

		if (data) {
			this.current = JSON.parse(data);
		}
	}

	private saveToLocalStorage() {
		localStorage.setItem(CheckInStorage.STORAGE_KEY, JSON.stringify(this.current));
	}
}

export const checkInStorage = new CheckInStorage();
