# Backend Application for Payment Processor

## Description

This backend application provides the necessary APIs to handle product management, order creation, and payment processing. The key functionalities include:

1. **Payment Endpoint:** Processes payments through a payment gateway.
2. **Products Endpoint:** Manages the creation and listing of products.
3. **Products Endpoint:** Manages the creation and listing of products.

## Endpoints

1. **payments:** `/payment`
2. **orders:** `/orders`
3. **products:** `/products`

## Req Body:

1. **payments:**

```json
{
  "number": "4242424242424242",
  "cvc": "123",
  "exp_month": "08",
  "exp_year": "28",
  "card_holder": "José Pérez"
}
```

2. **orders:**

```json
{
  "productId": "677afce0046258bf537c8afb",
  "quantity": 1,
  "customer": "John Doe",
  "shippingAddress": "Str 1 1 1",
  "productDetails": {
    "title": "Pine forest scent",
    "description": "Original pine forest recipe",
    "price": 35,
    "imageUrl": "https://images.pexels.com/photos/3270223/pexels-photo-3270223.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "stock": 7
  }
}
```

3. **products:**

```json
{
  "title": "Pine forest scent",
  "description": "Original pine forest recipe",
  "price": 35,
  "imageUrl": "https://images.pexels.com/photos/3270223/pexels-photo-3270223.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "stock": 8
}
```

## Postman Collection

To test the endpoints, use the following Postman collection: [Postman Collection]("https://web.postman.co/workspace/My-Workspace~f02922e6-eb5d-4363-819f-46a926e65dbe/collection/40794067-367a6fce-62c8-482f-beff-0df4f252c04c?share=true&origin=tab-menu").

> [!NOTE]
> Please request access to the workspace as postman doesn't allow to share a public workspace

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
