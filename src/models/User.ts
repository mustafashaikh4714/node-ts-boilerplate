/* eslint-disable prefer-arrow-callback */
import { DocumentType, getModelForClass, modelOptions, pre, prop } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { HookNextFunction } from 'mongoose'
import cleanDoc from '../utils/cleanDoc'
import { Password } from '../utils/password'

function pre_save(this: User, done: HookNextFunction) {
  if (this.isModified('password')) {
    // hash the password
    const hashed = Password.toHash(this.get('password'))
    this.set('password', hashed)
  }
  done()
}

@pre('save', pre_save)
@modelOptions({ schemaOptions: { collection: 'users', toJSON: cleanDoc() } })
export class UserModel extends TimeStamps {
  @prop({ required: true })
  public username!: string

  @prop({ required: true })
  public email!: string

  @prop({ required: true })
  public password!: string

  public static build(attrs: UserModel) {
    return new User(attrs)
  }
}

export type User = DocumentType<UserModel>
export const User = getModelForClass(UserModel)
