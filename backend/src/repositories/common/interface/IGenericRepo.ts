import {
  Model,
  Document,
  SortOrder,
  PopulateOptions,
  PipelineStage,
  ClientSession,
  HydratedDocument,
  UpdateQuery,
  FilterQuery,
} from "mongoose";

export interface MongooseOptions {
  session?: ClientSession;
  new?: boolean;
  upsert?: boolean;
  ordered?: boolean;
  runValidators?: boolean;
}

export type PopulateArg = PopulateOptions | PopulateOptions[] | string[];

export interface IGenericRepository<T extends Document> {
  create(payload: Partial<T>, options?: MongooseOptions): Promise<T>;
  create(payload: Partial<T>[], options?: MongooseOptions): Promise<T[]>;
  createWithSession(data: Partial<T>, session: ClientSession): Promise<T>;
  createManyWithSession(
    data: Partial<T>[],
    session: ClientSession,
  ): Promise<T[]>;

  findOne(
    filter: FilterQuery<T>,
    populate?: PopulateArg,
    session?: ClientSession,
  ): Promise<T | null>;
  findById(id: string, session?: ClientSession): Promise<T | null>;
  findByIdWithLock(id: string, session: ClientSession): Promise<T | null>;

  findAll(
    filter?: FilterQuery<T>,
    populate?: PopulateArg,
    sort?: Record<string, SortOrder>,
  ): Promise<T[] | null>;
  findAllWithSession(filter: FilterQuery<T>, session: ClientSession): Promise<T[] | null>;

  update(
    id: string,
    data: UpdateQuery<T>,
    options?: MongooseOptions,
  ): Promise<T | null>;
  updateWithSession(
    id: string,
    data: UpdateQuery<T>,
    session: ClientSession,
  ): Promise<T | null>;

  updateOne(
    filter: FilterQuery<T>,
    data: UpdateQuery<T>,
    options?: MongooseOptions,
  ): Promise<T | null>;
  updateMany(
    filter: FilterQuery<T>,
    data: UpdateQuery<T>,
    options?: MongooseOptions,
  ): Promise<void>;

  delete(id: string): Promise<T | null>;
  deleteWithSession(id: string, session: ClientSession): Promise<T | null>;

  findByIdWithPopulate(id: string, populate?: PopulateArg): Promise<T | null>;
  updateOneWithPopulate(
    filter: FilterQuery<T>,
    data: UpdateQuery<T>,
    populate?: PopulateArg,
  ): Promise<T | null>;
  paginate(
    filter: FilterQuery<T>,
    page: number,
    limit: number,
    sort?: Record<string, SortOrder>,
    populate?: PopulateArg,
  ): Promise<{ data: T[]; total: number }>;
  paginateWithAggregation(
    pipeline: PipelineStage[],
    page: number,
    limit: number,
  ): Promise<{ data: T[]; total: number }>;
  findOneAndUpdate(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>,
    options?: MongooseOptions,
  ): Promise<T | null>;
  aggregate<R = T>(pipeline: PipelineStage[]): Promise<R[]>;
  find(
    filter: FilterQuery<T>,
    populate?: PopulateArg,
    sort?: Record<string, SortOrder>,
  ): Promise<T[]>;
  countDocuments(filter: FilterQuery<T>): Promise<number>;

  findWithProjection(
    filter: FilterQuery<T>,
    projection: Record<string, 0 | 1>,
    populate?: PopulateArg,
    sort?: Record<string, SortOrder>,
  ): Promise<T[]>;

  findOneWithProjection(
    filter: FilterQuery<T>,
    projection: Record<string, 0 | 1>,
    populate?: PopulateArg,
    session?: ClientSession,
  ): Promise<T | null>;

  findOneAndDelete(
    filter: FilterQuery<T>,
    options?: MongooseOptions,
  ): Promise<T | null>;
  deleteMany(filter: FilterQuery<T>, options?: MongooseOptions): Promise<void>;
}
