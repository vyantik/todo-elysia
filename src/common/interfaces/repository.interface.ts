export interface IEntity {
	id: string
}

export interface IRepository<T extends IEntity> {
	findAll(id?: string): Promise<T[]>
	findById(id: string): Promise<T | null>
	save(entity: T): Promise<T>
	delete(id: string): Promise<boolean>
	create(entity: T, ownerId?: string): Promise<T>
}
