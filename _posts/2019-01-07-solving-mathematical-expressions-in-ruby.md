---
layout: post
title:  "Solving Mathematical Equations in Ruby - Part 1"
redirect_from:
  - /2019/01/07/solving-mathimatical-expressions-in-ruby/
---

I came across a programming problem online of being able to solve mathimatical equations. That seemed like an interesting problem to me, so I decided to give it a shot. This series of posts is my approach to solving the problem. 

What I want to start with is simply being able to solve a mathematical expression, such as `1 + 2`. It seems to me that this could be broken down into two parts.

1. Parse the string into a format that is easy to evaluate.
2. Evaluate the result of parsing the string.

# Step 2: Evaluating the result of parsing the string

I'm going to start with step 2 because it will give me an easy result to test. The format I am going to parse into is [Reverse Polish Notation](https://en.wikipedia.org/wiki/Reverse_Polish_notation). 

Let's write our first test:

```ruby
# spec/solver.rb

require 'rspec'
require_relative '../solver'

describe Solver do
  context 'can evaluate expressions in Reverse Polish Notation such as:' do
    it '1 + 2' do
      rpn = ['1', '2', '+']
      expect(subject.evaluate(rpn)).to eq(3)
    end
  end
end
```

The algorithm for evaluating an expression in reverse polish notation is quite simple. 

```
For each token in the RPN array,
  If it is an operand, push it onto an output array
  If it is an operator, pop the last two operands off the output array, 
    solve, and push the result onto the output array.
  
When there are no tokens left, the number in the output array is the 
  result.
```

Let's give that a try:

```ruby
# solver.rb

module Solver
  def self.evaluate(rpn)
    output = []

    rpn.each do |token|
      case type(token)
      when :operand then output << Integer(token, 10)
      when :operator then
        operand2, operand1 = [output.pop, output.pop]
        output << operate(token, operand1, operand2)
      end
    end

    output.first
  end

  def self.type(token)
    case token
    when /\d+/ then :operand
    when /[\+]/ then :operator
    end
  end

  def self.operate(operator, operand1, operand2)
    case operator
    when '+' then operand1 + operand2
    end
  end
end
```

[Code on Github](https://github.com/d3chapma/equation_solver/commit/b8bb517537eb940c150048b050b00473844c3d15)

This works and we can easily expand it by just adding to the `type` and `operate` methods. Let's add a new test with a few more operators.

```ruby
# spec/solver.rb

# ...

describe Solver do
  context 'can evaluate expressions in Reverse Polish Notation such as:' do
    # ...

    it '((15 / (7 - (1 + 1))) * 3) - (2 + (1 + 1))' do
      rpn = ['15', '7', '1', '1', '+', '-', '/', '3', '*', '2', '1', '1', '+', '+', '-',]
      expect(subject.evaluate(rpn)).to eq(5)
    end
  end
end
```


```ruby
# solver.rb

module Solver
  # ...

  def self.type(token)
    case token
    when /\d+/ then :operand
    when /[\+\-\/\*]/ then :operator
    end
  end

  def self.operate(operator, operand1, operand2)
    case operator
    when '+' then operand1 + operand2
    when '-' then operand1 - operand2
    when '*' then operand1 * operand2
    when '/' then operand1 / operand2
    end
  end
end
```

[Code on Github](https://github.com/d3chapma/equation_solver/commit/8c90bc1662eb8b5d273a4f76d83234b94d74d09a)

A simple change to handle the different types of operators and we successfully can evaluate an expression in reverse polish notation that includes addition, subtraction, multiplication, and division.

In the next article we will look at converting an expression from infix notation into reverse polish notation.
