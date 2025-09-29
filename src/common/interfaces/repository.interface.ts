export interface IEntity {
	id: string
}

export interface IRepository<T extends IEntity> {
	findAll(): Promise<T[]>
	findById(id: string): Promise<T | null>
	save(entity: T): Promise<T>
	delete(id: string): Promise<boolean>
}
