import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }
  findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }
  countByEmail(email: string) {
    return this.userModel.countDocuments({ email }).exec();
  }
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.findByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(pass, user.password);
      if (isMatch) {
        delete user.password;
        return user;
      }
    }
    return null;
  }
  async create(createUserDto: CreateUserDto) {
    const count = await this.countByEmail(createUserDto.email);
    if (count >= 1) {
      throw new ConflictException('Email already exists');
    }
    const hash = await this.hashPassword(createUserDto.password);
    const createdUser = new this.userModel({
      ...createUserDto,
      password: hash,
    });
    return createdUser.save();
  }
  async seeding(): Promise<boolean> {
		const count = await this.userModel.countDocuments();
		if (!count) {
			await this.userModel.insertMany([
				{
					fullName: "ADMIN",
					password: await this.hashPassword('123qwe'),
					email: "admin@gmail.com",
					phone: "0123456789",
					role: "ADMIN",
					avatar: "21232f297a57a5a743894a0e4a801fc3-1710227641511.png",
				},
				{
					fullName: "User",
					password: await this.hashPassword('123qwe'),
					email: "user@gmail.com",
					phone: "0123456789",
					role: "USER",
					avatar: "ee11cbb19052e40b07aac0ca060c23ee-1710227672382",
				},
				{
					fullName: "TESTING",
					password: await this.hashPassword('123qwe'),
					email: "testing@gmail.com",
					phone: "0123456789",
					role: "USER",
					avatar: "download-14edf5f985c9efbeafdba108ab63709a3-1710227692167.png",
				},
			]);
			return true;
		}
		return false;
	}
}
