import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import { Model } from 'mongoose';
import { BOOK_SEEDING } from './book.seeding';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}
  create(createBookDto: CreateBookDto) {
		return new this.bookModel(createBookDto).save();
	}
  category() {
		return this.bookModel
			.distinct("category")
			.sort({ category: 1 })
			.exec()
			.then((categories) => {
				return categories;
			});
	}
  async seeding(): Promise<boolean> {
		const count = await this.bookModel.countDocuments();
		if (!count) {
			await this.bookModel.insertMany(BOOK_SEEDING);
			return true;
		}
		return false;
	}
  async updateBookQuantity(_id, quantity: number) {
		const res = await this.bookModel.findById(_id);
		const bookDetail = res ? res.toObject() : null;
		if (!bookDetail)
			throw new NotFoundException(
				"Cannot found the book with given book id",
			);
		if (bookDetail.quantity > quantity) {
			await this.bookModel.updateOne(
				{ _id },
				{ quantity: bookDetail.quantity - quantity },
			);
		} else
			throw new BadRequestException(
				"You have exceeded the current book's quantity",
			);
	}
	async getCount(): Promise<number> {
		return this.bookModel.countDocuments();
	}
  findAll() {
    return this.bookModel.find().exec();
  }

  findOne(id: string) {
    return this.bookModel.findById(id).exec();
  }

}
