import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { PostsService } from './posts.service'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiForbiddenResponse({ description: 'Denied Access' })
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto)
  }

  @ApiForbiddenResponse({ description: 'Denied Access' })
  @Get()
  findAll() {
    return this.postsService.findAll()
  }

  @ApiForbiddenResponse({ description: 'Denied Access' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id)
  }

  @ApiForbiddenResponse({ description: 'Denied Access' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto)
  }

  @ApiForbiddenResponse({ description: 'Denied Access' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id)
  }
}
