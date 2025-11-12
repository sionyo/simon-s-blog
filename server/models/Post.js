import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },
    content: {
        type: String,
        required: true
    },
    excerpt: {
        type: String,
        maxlength: 300
    },
    slug: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    },
    tags:[{
        type : String,
        trim: true
    }]
}, {
    timestamps: true
})


// Generate slug from title before saving
postSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
  next();
});

// Generate excerpt from content if not provided
postSchema.pre('save', function(next) {
  if (!this.excerpt && this.content) {
    this.excerpt = this.content.substring(0, 150) + '...';
  }
  next();
});

export default mongoose.model('Post', postSchema);