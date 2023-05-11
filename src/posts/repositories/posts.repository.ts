import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreatePostDto } from '../dto/create-post.dto'
import { PostEntity } from '../entities/post.entity'
import { UpdatePostDto } from '../dto/update-post.dto'
import { NotFoundError } from 'src/common/errors/types/notFoundError'

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto): Promise<PostEntity> {
    const { authorEmail } = createPostDto

    // Método para remover um item do objeto
    delete createPostDto.authorEmail

    const user = await this.prisma.user.findUnique({
      where: {
        email: authorEmail,
      },
    })

    if (!user) {
      throw new NotFoundError('Author not found!')
    }

    const data: Prisma.PostCreateInput = {
      /*
        Recebo todos os parâmetros do objeto, com exceção do "authorEmail"
        Visto que esta propriedade foi removida acima.
      */
      ...createPostDto,
      author: {
        connect: {
          email: authorEmail,
        },
      },
    }

    return this.prisma.post.create({
      data,
    })
  }

  async findAll(): Promise<PostEntity[]> {
    return this.prisma.post.findMany({
      include: {
        author: true,
      },
    })
  }

  async findOne(id: number): Promise<PostEntity> {
    return this.prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<PostEntity> {
    return this.prisma.post.update({
      where: {
        id,
      },
      data: updatePostDto,
    })
  }

  async remove(id: number): Promise<PostEntity> {
    return this.prisma.post.delete({
      where: {
        id,
      },
    })
  }
}
