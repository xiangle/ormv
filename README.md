# ormv

Postgresql ORM模型

## 特性

* 使用函数链风格的查询表达式，简约、直观、易于读写

* 依然保留了类似SQL的语法特征，降低学习成本

* 支持JSON类型字段建模，提供强大的嵌套数据校验功能

* 支持扩展自定义的运算符函数，对于定制化需求非常有用


## Install

```
npm install ormv
```

## 示例

```js
async function main() {

   // 数据库参数配置
   const client = new Ormv({
      db: {
         host: 'localhost',
         database: 'test',
         username: 'postgres',
         password: 'postgres',
         port: 5432,
      },
      logger: true
   })

   // 连接数据库
   await client.connect()

   // sql查询，支持参数化查询
   await client.query(sql)

   const { CHAR, INTEGER, JSONB, BOOLEAN } = Ormv.Type

   // 数据表建模
   const tasks = client.define('tasks', {
      'id': {
         type: INTEGER,
         primaryKey: true,
      },
      'keywords': {
         type: JSONB
      },
      'email': {
         type: CHAR,
         validate: {
            isEmail: true
         }
      },
   })

   // 操作符
   const { $and, $in, $as } = Ormv.Op;

   // 基于数据模型的结构化查询
   const result = await tasks
      .select('id', 'keywords', $as("platform", "xx"))
      .leftJoin("users")
      .on({ 'tasks.id': 'users.uid' })
      .where({
         id: $in(50, 51),
         keywords: {}
      })
      .or({ id: 5 })
      .and({
         id: 5,
         keywords: {}
      })
      .or({ id: 5 })
      .order({
         "tasks.id": "DESC",
         "tasks.keywords": "DESC"
      })
      .limit(10)
      .catch(error => {
         console.log(error)
      })

}
```

## 定义模型

```js
   const model = client.define(name, options)
```

* name `String` - 模型名称

* options `Object` - 模型字段配置项

## 模型同步

模型与数据库表之间支持三种同步模式：

### 默认模式

> 尝试创建新的数据表，当指定的表已存在时请求被拒绝，不做任何操作。

```js
model.sync()
```

### 增量模式

> 在已有表上新增字段，该模式只会添加新的列，不改变已有列和数据。

```js
model.sync('increment')
```

### 重置模式

> 删除已有的数据表重新构建表结构。

```js
model.sync('rebuild')
```

## 函数链

函数链用于生成相对安全的Sql语句，尽可能避免SQL注入。

### insert 函数链

#### model.insert(data)

插入新数据



### find、select 函数链

#### model.find(and)

* and `Object` - and过滤条件

查询多条记录

#### model.select(field, ...)

* [field] `String` - 字段名

查询多条记录，选择返回字段

#### model.findOne(and)

* and `Object` - and过滤条件

查询单条记录

#### model.findPK(id)

* id `Number` - 主键id

查询主键id

#### model.order(options) 

* options `Object` - 排序字段

#### model.offset(value)

* value `Number` - 限定查询结果的起始位置

#### model.limit(value)

* value `Number` - 限制返回结果数量

#### model.count()

查询数据总量



### update 函数链

#### model.update(data)

更新数据

#### model.updateMerge(data)

更新数据，用合并的方式更新json、jsonb类型


### destroy 函数链

#### model.destroy()

删除数据


### find、update、destroy 通用逻辑函数链

#### model.where(options)

#### where(options).and(options)

#### where(options).or(options)

* options `Object` - and过滤条件

<!-- * transaction `*` - 事务选项，待开发 -->


## 操作符函数

### 查询函数

> 用于options.where属性中，作为数据筛选条件，包含逻辑运算符、比较运算符等。

<!-- ### 逻辑运算符

#### Op.$and()

逻辑与，支持链式操作

#### Op.$or()

逻辑或，支持链式操作 -->

### 原生sql运算符

#### Op.$sql()

添加原生sql子句，内置单引号转义。

### 比较运算符

#### Op.$eq()

#### Op.$ne()

#### Op.$gte()

#### Op.$gt()

#### Op.$lte()

#### Op.$lt()


### 其它操作符

#### Op.$not()

#### Op.$is()

#### Op.$in()

#### Op.$notIn()

#### Op.$like()

#### Op.$notIn()

#### Op.$notLike()

#### Op.$iLike()

#### Op.$notILike()

#### Op.$regexp()

#### Op.$regexp()

#### Op.$regexp()

#### Op.$regexp()

#### Op.$notRegexp()

#### Op.$iRegexp()

#### Op.$notIRegexp()

#### Op.$between()

#### Op.$notBetween()

#### Op.$overlap()

#### Op.$contains()

#### Op.$contained()

#### Op.$adjacent()

#### Op.$strictLeft()

#### Op.$strictRight()

#### Op.$noExtendRight()

#### Op.$noExtendLeft()

#### Op.$any()

#### Op.$all()

#### Op.$values()

#### Op.$col()

#### Op.$placeholder()

#### Op.$join()

#### Op.$raw()


### Update函数

> 用于json类型数据的插入、合并、删除操作

#### Op.$merge()

#### Op.$set()

#### Op.$insert()

#### Op.$insertByPath()

#### Op.$insertFirst()