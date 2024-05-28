---
layout: post
title:  "How to run an LLM locally on CPU"
---

I've been playing around with LLMs a lot lately. I'm interested in being able
to run models locally for work, but many of the best models have very high
memory bandwidth requirements. I came across the idea of quantization of a model, where the precision of a tensor is reduced in order to speed up inference and reduce memory requirements. This is the process I've learned to
take almost any model and quantize it, making it possible to run the model
effectively on CPU.

## Set up Hugging Face

[Hugging Face](https://huggingface.co/) is like the Github of the AI world right now. If you want to get access to open source models, that is the place to be. You'll want to sign up for an account, [install the huggingface-cli](https://huggingface.co/docs/huggingface_hub/main/en/guides/cli#getting-started) and log in.

```sh
brew install huggingface-cli
huggingface-cli login
```

## Set up llama.cpp

[llama.cpp](https://github.com/ggerganov/llama.cpp/?tab=readme-ov-file#llamacpp)
is a tool for running models on a wide variety of hardware. In order to set it up, first clone the repository

```sh
git clone git@github.com:ggerganov/llama.cpp.git
```

Then, build the project in the root of the repo

```sh
cd llama.cpp
make -j8
```

## Download a model from Hugging Face

You can browse the available models [here](https://huggingface.co/models).

> Choosing a model is beyond the scope of this post, but you might choose a model based on features, benchmarks, or number of parameters (more parameters means higher memory requirements and longer inference times, but hopefully better quality results).

![Clone Hugging Face Model](/images/clone-huggingface-model.png)

Once you have chosen a model, click the "Clone respository" button and follow the instructions in the modal dialog.

In this example, I will be using [Meta Llama 3 3B Instruct](https://huggingface.co/meta-llama/Meta-Llama-3-8B-Instruct) and saving it in a `models` directory that lives outside of the llama.cpp repo.

## Quantize the model

Finally! We are now ready to quantize the model. Almost...

First we need to convert the model to `gguf` format. That is one of the formats that llama.cpp can run inference with.

```sh
python convert.py ../models/Meta-Llama-3-8B-Instruct/ --outfile ../models/Meta-Llama-3-8B-Instruct.gguf --outtype f16 --vocab-type bpe
```

Ok, *now* we can quantize. This command takes the `.gguf` we generated in the last step and creates a new one using the `q4_k_m` method, which quantizes to 4-bits.

```sh
./quantize ../models/Meta-Llama-3-8B-Instruct.gguf ../models/Meta-Llama-3-8B-Instruct_q4_k_m.gguf q4_k_m
```

## Run the model!

You can run the model as a REPL:

```sh
./main -m ../models/Meta-Llama-3-8B-Instruct_q4_k_m.gguf -t 16 -n 256 --repeat_penalty 1.0 -f prompts/chat-with-bob.txt --color -i -r "User:"
```

Or as a web server:

```sh
./server -m ../models/Meta-Llama-3-8B-Instruct_q4_k_m.gguf -t 16 -n 256
```

### Resources

[Hugging Face](https://huggingface.co/)

[llama.cpp](https://github.com/ggerganov/llama.cpp/?tab=readme-ov-file#llamacpp)

[Open Source Large Lanuage Models in 3 Weeks on O'Reilly](https://learning.oreilly.com/search/?q=Open%20Source%20Large%20Language%20Models%20in%203%20Weeks&type=*&rows=10)
