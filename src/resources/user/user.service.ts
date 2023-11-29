import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { hashSync } from 'bcryptjs'
import { Model } from 'mongoose'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User, UserDocument } from './schemas/user.schema'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) { }

  create(createUserDto: CreateUserDto) {
    let { password } = createUserDto
    password = hashSync(password)
    const newUser = new this.userModel({ ...createUserDto, password })

    return newUser.save()
  }

  async findOne(id: string): Promise<UserDocument> {
    return this.userModel
      .findById(id).exec()
  }

  async findOneByMailOrUsername(data: string): Promise<UserDocument> {
    return this.userModel
      .findOne({ $or: [{ username: data }, { email: data }] }).exec()
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    let { password } = updateUserDto
    if (password) password = hashSync(password)
    return this.userModel.findByIdAndUpdate(id, { ...updateUserDto })
  }

  remove(id: number) {
    return this.userModel.findByIdAndUpdate(id, { isActive: false }).exec()
  }
}
